from django.urls import path
from . import views

urlpatterns = [
    path('solve_puzzle/', views.solve_puzzle, name="solve_puzzle"),
    path('get_last_2/', views.get_last_2, name="get_last_2"),
]