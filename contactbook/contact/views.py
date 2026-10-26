from django.shortcuts import render
from rest_framework import viewsets
from .models import Contact
from .serializers import ContactSerializers

# Create your views here.

class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializers

