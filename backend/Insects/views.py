from rest_framework import viewsets
from rest_framework.response import Response
from .models import FruitFly
from django.db.models import Avg
from rest_framework import permissions
from django.db.models.functions import Round



class FruitFlyViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]
    def list(self, request):
        queryset = FruitFly.objects.all()

        start_date = self.request.query_params.get('start_date', None)
        end_date = self.request.query_params.get('end_date', None)
        if start_date is not None and end_date is not None:
            queryset = queryset.filter(created__range=(start_date, end_date))

        data = queryset.values('date').annotate(avg_count=Round(Avg('avg_count')))

        return Response(data)
    

class FruitFlyGridViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]
    def list(self, request):
        queryset = FruitFly.objects.all()

        start_date = self.request.query_params.get('start_date', None)
        end_date = self.request.query_params.get('end_date', None)
        if start_date is not None and end_date is not None:
            queryset = queryset.filter(date__range=(start_date, end_date))

        data = queryset.values('id', 'name', 'avg_count', 'time_stamp', 'date').annotate(avg_count_rounded=Round(Avg('avg_count')))

        return Response(data)