<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laragear\WebAuthn\WebAuthnAuthentication;
use Laragear\WebAuthn\Contracts\WebAuthnAuthenticatable;

use Ramsey\Uuid\Uuid;

class User extends Authenticatable implements WebAuthnAuthenticatable
{
    use HasFactory, Notifiable, WebAuthnAuthentication;

    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    public function canRegisterWebauthn(): bool
    {
        return true;
    }

    /**
     * Indica ao pacote WebAuthn para usar a coluna UUID como identificador.
     */
    public function getWebAuthnIdentifier(): string
    {
        // Isto vai devolver sempre "1" (como string) para o teu user.
        // É impossível o iPhone e o Laravel não concordarem com isto.
        return (string) $this->id;
    }

    // public function webAuthnId(): \Ramsey\Uuid\UuidInterface
    // {
    //     // Usa o UUID guardado sem hífens, convertido para bytes
    //     $hex = str_replace('-', '', $this->uuid);
    //     return \Ramsey\Uuid\Uuid::fromBytes(hex2bin($hex));
    // }
    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
