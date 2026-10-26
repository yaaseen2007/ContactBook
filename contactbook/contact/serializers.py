from .models import Contact
from rest_framework import serializers

class ContactSerializers(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = "__all__"