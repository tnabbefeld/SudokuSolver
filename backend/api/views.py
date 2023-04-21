from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .utils import solve_sudoku


@api_view(['GET'])
def get_solution(request):

    problem = request.data["puzzle"]
    solution = problem.copy()

    solution_found = solve_sudoku(solution)

    if(solution_found):
        return Response({"solution": solution})

    return False
