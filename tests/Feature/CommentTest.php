<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CommentTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */

    public function testIfCanGetComments()
    {
        $response = $this->getJson('/api/comments');
        $response->assertStatus(200);
    }

    public function testIfCanCreateComment()
    {
        $response = $this->postJson('/api/comments', [
            'name' => "test",
            'comment_text' => 'test comment text'
        ]);

        $response->assertStatus(201)
            ->assertJson([
                'name' => 'test'
            ]);
    }

    public function testCreateCommentValidationFailed()
    {
        $response = $this->postJson('/api/comments');

        $response->assertStatus(422);
    }

    public function testCreateCommentSuccessWithParent()
    {
        $createdResponse = $this->postJson('/api/comments', [
            'comment_text' => 'Wew',
            'name' => 'rollit',
        ]);

        $created = json_decode($createdResponse->getContent());

        $response = $this->postJson('/api/comments', [
            'comment_text' => 'Whoppy',
            'parent_id' => "$created->id",
            'name' => 'das',
        ]);

        $response->assertStatus(201);
    }

    public function testIfCanFetchChildrenComments()
    {
        $createdResponse = $this->postJson('/api/comments', [
            'comment_text' => 'Wew',
            'name' => 'rollit',
        ]);

        $created = json_decode($createdResponse->getContent());

        $response = $this->getJson("/api/comments/$created->id");

        $response->assertStatus(200);
    }

    public function testIfChildrenCommentsNotFound()
    {
        $response = $this->getJson('/api/comments/100000');

        $response->assertStatus(404);
    }
}
