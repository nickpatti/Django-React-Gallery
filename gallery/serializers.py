from rest_framework import serializers
from .models import Image, Album


class ImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = Image
        fields = '__all__'


class AlbumGetSerializer(serializers.ModelSerializer):
    images = ImageSerializer(many=True, read_only=True)

    class Meta:
        model = Album
        fields = ('id', 'title', 'images')


class AlbumPostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Album
        fields = '__all__'
