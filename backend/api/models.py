from django.db import models

class SolvedPuzzle(models.Model):
    problem = models.JSONField()
    solution = models.JSONField()

