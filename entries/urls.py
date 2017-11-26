from django.conf.urls import include, url
from rest_framework.routers import DefaultRouter
from entries import views


# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'entries', views.EntryViewSet)
router.register(r'User', views.UserViewSet)

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls'))
]

