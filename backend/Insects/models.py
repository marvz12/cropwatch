from django.db import models

class FruitFly(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    avg_count = models.IntegerField()
    time_stamp = models.TimeField(auto_now_add=True)
    date = models.DateField(auto_now_add=True)
