from rest_framework import serializers
from django.contrib.auth.models import User
from entries.models import Entry

class EntrySerializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Entry
        fields = ('id', 'name', 'amount', 'start_date', 'end_date', 'frequency', 'cashflow_type', 'owner')


class UserSerializer(serializers.HyperlinkedModelSerializer):
    entries = serializers.HyperlinkedRelatedField(many=True, view_name='entry-detail', read_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'entries')
