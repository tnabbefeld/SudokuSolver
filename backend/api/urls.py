from django.urls import path
from . import views

urlpatterns = [
    path('get_solution/', views.get_solution, name="get_solution"),
]