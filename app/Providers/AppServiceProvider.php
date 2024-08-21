<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Notifications\Messages\MailMessage;
use Laravel\Fortify\Fortify;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        VerifyEmail::toMailUsing(function ($notifiable, $url) {
            return (new MailMessage)
                ->subject('Verify Email Address') // Betreff der E-Mail
                ->line('Click the button below to verify your email address.') // Nachricht im E-Mail-Text
                ->action('Verify Email Address', $url); // Aktionstext und URL-Link
        });

        Fortify::loginView(function () {
            return view('auth.login');
        });
    }
}
