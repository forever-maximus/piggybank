from entries.models import Entry
from entries.models import Category
from entries.serializers import EntrySerializer, UserSerializer, CategorySerializer
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.response import Response
from django.contrib.auth.models import User


class EntryViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides 'list', 'create', 'retrieve',
    'update' and 'destroy' actions.
    """
    queryset = Entry.objects.all()
    serializer_class = EntrySerializer
    permission_classes = (permissions.IsAuthenticated,)

    def list(self, request):
        # Only get items for the specific user
        user = self.request.user
        queryset = Entry.objects.filter(owner=user)
        serializer_class = EntrySerializer(queryset, many=True)
        return Response(serializer_class.data)

    def perform_create(self, serializer):
        """Sets the user profile to the logged in user."""
        print (self.request.data)
        serializer.save(owner=self.request.user)


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = (permissions.IsAuthenticated,)

    def list(self, request):
        # Only get items for the specific user
        user = self.request.user
        queryset = Category.objects.filter(owner=user)
        serializer_class = CategorySerializer(queryset, many=True)
        return Response(serializer_class.data)

    def perform_create(self, serializer):
        """Sets the user profile to the logged in user."""
        serializer.save(owner=self.request.user)


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    """
    This viewset automatically provides `list` and `detail` actions.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
