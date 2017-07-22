<?php

namespace TDLF\Services;

use Silex\Application;

class MailManager
{
    private $app;

    private $mailer;

    function __construct(Application $app)
    {
        $transport = \Swift_SmtpTransport::newInstance('smtp.gmail.com', 587, 'tls')
            ->setUsername('tdlf7fault@gmail.com')
            ->setPassword('team7fault');

        $this->mailer = \Swift_Mailer::newInstance($transport);

        $this->app = $app;
    }

    public function getMessage($subject, $from, $to)
    {
        $message = \Swift_Message::newInstance()
            ->setSubject($subject)
            ->setFrom($from)
            ->setTo($to);

        return $message;
    }

    public function setBody($message, $body)
    {
        $message->setBody(
            $body,
            'text/html'
        );

        return $message;
    }

    public function setTemplate($message)
    {
      $template = file_get_contents(__DIR__ . '/../Mail/template.html');

      return ($this->setBody($message, $template));
    }

    public function sendMessage($message) {
        $result = $this->mailer->send($message);
        return $result;
    }


    public function setHtmlBody($message, $path, $params)
    {
        $params['tdlf_img'] = $message->embed(\Swift_Image::fromPath(__DIR__ . '/../Mail/tdlf.png'));
        $bodyContent = file_get_contents($path);

        $bodyLoader = new \Twig_Loader_Array([
            'body.html' => $bodyContent,
        ]);

        $loader = new \Twig_Loader_Chain([
            $bodyLoader
        ]);

        $twig = new \Twig_Environment($loader);
        $html = $twig->render('body.html', [
            'params' => $params
        ]);

        return $this->setBody($message, $html);
    }

    public function setCompanyInvitationBody($message, $params)
    {
        return $this->setHtmlBody(
            $message,
            __DIR__ . '/../Mail/company-invitation-mail.html.twig',
            $params
        );
    }

    public function setDateInvitationBody($message, $params)
    {
        return $this->setHtmlBody(
            $message,
            __DIR__ . '/../Mail/date-invitation-mail.html.twig',
            $params
        );
    }

    public function setTeamInvitationBody($message, $params)
    {
        return $this->setHtmlBody(
            $message,
            __DIR__ . '/../Mail/team-invitation-mail.html.twig',
            $params
        );
    }
}