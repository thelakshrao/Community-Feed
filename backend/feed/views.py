from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.db.models import Sum, Count, Q
from django.utils import timezone
from datetime import timedelta
from django.contrib.auth.models import User
from .models import Post, Comment, Like
from .serializers import PostSerializer, CommentSerializer


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all().prefetch_related('comments__replies').order_by('-created_at')
    serializer_class = PostSerializer

    def perform_create(self, serializer):
        user = User.objects.get(username='admin')
        serializer.save(author=user)

    @action(detail=True, methods=['post'])
    def comment(self, request, pk=None):
        post = self.get_object()
        user = User.objects.get(username='admin')
        content = request.data.get('content')
        
        if not content:
            return Response({"detail": "Content required"}, status=status.HTTP_400_BAD_REQUEST)
            
        Comment.objects.create(post=post, author=user, content=content)
        return Response({"detail": "Comment added"}, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['post'])
    def like(self, request, pk=None):
        post = self.get_object()
        user = User.objects.get(username='admin')
        like_filter = Like.objects.filter(user=user, post=post)

        if like_filter.exists():
            like_filter.delete()
            return Response({"detail": "Unliked"}, status=status.HTTP_200_OK)
        
        Like.objects.create(user=user, post=post)
        return Response({"detail": "Liked"}, status=status.HTTP_201_CREATED)
    

class LeaderboardViewSet(viewsets.ViewSet):
    def list(self, request):
        time_threshold = timezone.now() - timedelta(hours=24)
        users = User.objects.all()
        leaderboard_data = []

        for user in users:

            post_likes = Like.objects.filter(
                post__author=user, 
                created_at__gte=time_threshold
            ).count()

            comments_made = Comment.objects.filter(
                author=user, 
                created_at__gte=time_threshold
            ).count()

            total_karma = (post_likes * 5) + (comments_made * 1)

            if total_karma > 0:
                leaderboard_data.append({
                    "username": user.username,
                    "karma": total_karma
                })

        leaderboard_data = sorted(leaderboard_data, key=lambda x: x['karma'], reverse=True)[:5]
        return Response(leaderboard_data)