<?php

namespace TDLF\Services;

use Silex\Application;

class MailManagerService
{
    private $app;

    function __construct(Application $app)
    {
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
}