from rest_framework import serializers
from django.contrib.auth.models import User
from entries.models import Entry, Category

class EntrySerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Entry
        fields = ('id', 'name', 'amount', 'start_date', 'end_date', 'frequency', 'cashflow_type', 'category', 'owner')


class CategorySerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Category
        fields = ('id', 'name', 'colour', 'owner')


class UserSerializer(serializers.ModelSerializer):
    entries = serializers.HyperlinkedRelatedField(many=True, view_name='entry-detail', read_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'entries')
