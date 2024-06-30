
from django.views.generic import TemplateView
from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework.routers import DefaultRouter
from Insects.views import FruitFlyViewSet, FruitFlyGridViewSet

router = DefaultRouter()
router.register(r'fruitfly', FruitFlyViewSet, basename='fruitfly')
router.register(r'fruitflygrid', FruitFlyGridViewSet, basename='fruitflygrid')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('api/', include(router.urls)),
]


urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]