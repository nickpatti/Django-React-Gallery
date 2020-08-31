from rest_framework import routers
from .api import ImageViewSet, AlbumViewSet, AlbumPut, AlbumPost
from django.urls import path

router = routers.DefaultRouter()
router.register('api/image', ImageViewSet, 'image')
router.register('api/album', AlbumViewSet, 'album')

urlpatterns = [
    path('api/album/post/', AlbumPost.as_view(), name="album_post"),
    path('api/album/post/<int:pk>/', AlbumPut.as_view(), name="album_put"),
]

urlpatterns += router.urls
