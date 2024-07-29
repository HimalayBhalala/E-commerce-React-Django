from rest_framework import pagination
from rest_framework.response import Response

class CustomPagination(pagination.PageNumberPagination):
    def get_paginated_response(self, data):
        return Response({
            "count":self.page.paginator.count,
            "links":{
                "next":self.get_next_link(),
                "previous":self.get_previous_link()
            },
            "results":data
        })
    
class HomeProductPagination(pagination.PageNumberPagination):
    page_size = 8

class HomeCategoryProductPagination(pagination.PageNumberPagination):
    page_size = 4

class PopularProductPagination(pagination.PageNumberPagination):
    page_size = 4