from .models import Image, Album
from .serializers import ImageSerializer, AlbumGetSerializer, AlbumPostSerializer
from rest_framework import generics
from rest_framework import viewsets, permissions


class ImageViewSet(viewsets.ModelViewSet):
    queryset = Image.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ImageSerializer


class AlbumViewSet(viewsets.ModelViewSet):
    queryset = Album.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = AlbumGetSerializer


class AlbumPost(generics.ListCreateAPIView):
    queryset = Album.objects.all()
    serializer_class = AlbumPostSerializer


class AlbumPut(generics.RetrieveUpdateDestroyAPIView):
    queryset = Album.objects.all()
    serializer_class = AlbumPostSerializer
