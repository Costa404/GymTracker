<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
// Adiciona estas duas linhas abaixo:
use Laragear\WebAuthn\WebauthnAuthentication;
use Laragear\WebAuthn\Contracts\WebauthnAuthenticatable;

class User extends Authenticatable implements WebauthnAuthenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    // Adiciona o WebauthnAuthentication aqui dentro:
    use HasFactory, Notifiable, WebauthnAuthentication;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    public function canRegisterWebauthn(): bool
    {
        return true; // Força a autorização para todos os utilizadores autenticados
    }

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
