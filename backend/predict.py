
import numpy as np
from ultralytics import YOLO
import cv2
import time
import argparse
import supervision as sv
import psycopg2
from datetime import datetime






ZONE_POLYGON = np.array([
    [0.02, 0.95],
    [0.97, 0.95],
    [0.97, 0.05],
    [0.02, 0.05]
])

def parse_arguments() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description='CropWatch Project')
    parser.add_argument("--webcam-resolution",
                         default=[1920, 1080], 
                         nargs=2,
                         type=int
    )
    args = parser.parse_args()
    return args





def main():
    
    args = parse_arguments()
    frame_width, frame_height = args.webcam_resolution

    cap = cv2.VideoCapture("rtsp://cropwatch:12345678@192.168.1.100:554/stream1")
    #cap = cv2.VideoCapture("datasetv3.mp4")
    cap.set(cv2.CAP_PROP_FRAME_WIDTH, frame_width)
    cap.set(cv2.CAP_PROP_FRAME_HEIGHT, frame_height)

    conn = psycopg2.connect(
    host="localhost",
    database="cropwatch",
    user="postgres",
    password="Boneclinks1"
    
)

    model = YOLO("train_v3.2best.pt")

    box_anotator = sv.BoxAnnotator(
        thickness=2,
        color=sv.Color.red(),
        text_scale=0.4
        
    )

    trace_annotator = sv.TraceAnnotator(
        color=sv.Color.blue(),
        thickness=2,
        trace_length=30,
    )

    zone_polygon = (ZONE_POLYGON * np.array(args.webcam_resolution)).astype(int)
    zone = sv.PolygonZone(polygon=zone_polygon, frame_resolution_wh=tuple(args.webcam_resolution))
    zone_annotator = sv.PolygonZoneAnnotator(
        zone=zone,
        color=sv.Color.red(),
        thickness=2,
        text_thickness=4,
        text_scale=2,
        
    )

    tracker = sv.ByteTrack(
        track_buffer=30,
        track_thresh=0.25,
        
    )

    cv2.namedWindow("output", cv2.WINDOW_NORMAL)
    cur = conn.cursor()
    start_time = time.time()
    counts_1m = []
    counts_5m = []
    avg_objects_1m = 0
    avg_objects_5m = 0

    while True:
        ret, frame = cap.read()

        result = model(frame, agnostic_nms=True, conf=0.5)[0]
        detections = sv.Detections.from_ultralytics(result)
        detections = tracker.update_with_detections(detections)

        labels = [f"#{model.model.names[class_id]}"
                  for _, _, _, class_id, _ in detections]

        frame = box_anotator.annotate(
            scene=frame,
            detections=detections,
            labels=labels,
        )

        frame = trace_annotator.annotate(
            scene=frame,
            detections=detections,
        )

        zone.trigger(detections=detections)
        frame = zone_annotator.annotate(scene=frame)
        cv2.putText(frame, f"Average Count: {avg_objects_1m}", (50, 80), cv2.FONT_HERSHEY_SIMPLEX, 1, color=(0, 255, 0), thickness=3)
        cv2.putText(frame, f"Average Count: {avg_objects_5m}", (50, 130), cv2.FONT_HERSHEY_SIMPLEX, 1, color=(0, 255, 0), thickness=3)
        x = 400
        for count in counts_5m:
            
            cv2.putText(frame, f"{count}", (x, 130), cv2.FONT_HERSHEY_SIMPLEX, 1, color=(0, 255, 0), thickness=3)
            x+=40

        print(zone.current_count)
        counts_1m.append(zone.current_count)
        
        elapse_time = time.time() - start_time
       
        if elapse_time > 60:
            avg_objects_1m = int(sum(counts_1m) / len(counts_1m))
            print(f"Average count : {avg_objects_1m}")
            #cv2.putText(frame, f"Average Count: {avg_objects_1m}", (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, color=(255, 0, 0), thickness=2)
          
            start_time = time.time()
            counts_5m.append(avg_objects_1m)
            counts_1m = []
        
        if len(counts_5m) > 1:
            avg_objects_5m = int(sum(counts_5m) / len(counts_5m))
            counts_5m = []

            obj_name = "fruitfly" 
            
            cur.execute(
                """
                INSERT INTO "Insects_fruitfly" (name, avg_count, time_stamp, date) VALUES (%s, %s, %s, %s)
                """,
                (obj_name, avg_objects_5m, datetime.now().time(), datetime.now().date())
            )
            

        cv2.imshow("output", frame)
        conn.commit()
        if (cv2.waitKey(30) == 27):
            conn.close()
            break
    
    conn.close()


if __name__ == "__main__":
    main()
