from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import *
from .serializers import *
import copy

from .utils import solve_sudoku

"""
    Api call to return solver Sudoku puzzle board
"""
@api_view(['POST'])
def solve_puzzle(request):

    problem = request.data["puzzle"]
    solution = copy.deepcopy(problem)

    solution_found = solve_sudoku(solution)

    if(solution_found):
        solved_puzzle = SolvedPuzzle(problem=problem, solution=solution)
        solved_puzzle.save()

        return Response({"solution": solution})

    return False

"""
    Api call to return the last two solved sudoku puzzles
"""
@api_view(['GET'])
def get_last_2(request):
    last_2 = SolvedPuzzle.objects.all().order_by('-pk')[:2]
    serializer = SolvedPuzzleSerializer(last_2, many=True)
    return Response(serializer.data)
