from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PostViewSet, LeaderboardViewSet

router = DefaultRouter()
router.register(r'posts', PostViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('leaderboard/', LeaderboardViewSet.as_view({'get': 'list'})),
]