from rest_framework import serializers
from .models import *

class SolvedPuzzleSerializer(serializers.ModelSerializer):
    class Meta:
        model = SolvedPuzzle
        fields = '__all__'