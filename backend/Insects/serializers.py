from rest_framework import serializers
from models import FruitFly

fruitfly = FruitFly

class FruitflySerializers(serializers.ModelSerializer):
    class Meta:
        model = fruitfly
        fields = ['id', 'name', 'avg_count', 'time_stamp', 'date']