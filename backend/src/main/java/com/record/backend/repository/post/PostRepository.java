package com.record.backend.repository.post;

import org.springframework.data.jpa.repository.JpaRepository;

import com.record.backend.domain.post.Post;

public interface PostRepository extends JpaRepository<Post, Long> {
}