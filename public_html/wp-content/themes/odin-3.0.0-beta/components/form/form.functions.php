<?php

	/**
	 * 
	 */
	class Form {

		const MAP = array(
			'name' 			=> 'Nome',
			'email' 		=> 'E-mail',
			'phone' 		=> 'Telefone',
			'birthdate' 	=> 'Data de Nascimento',
			'zipcode' 		=> 'CEP',
			'address' 		=> 'Endereço',
			'number' 		=> 'Número',
			'neighborhood' 	=> 'Bairro',
			'city' 			=> 'Cidade',
			'state' 		=> 'Estado'
		);

		private $to 	 = '';
		private $subject = 'Formulário de Contato do Site';
		private $message = '';

		/**
	     * @return mixed
	     */
	    public function getTo() {
	        
	        return $this->to;
	    }

	    /**
	     * @param mixed $to
	     *
	     * @return self
	     */
	    public function setTo($to) {
	        
	        $this->to = $to;

	        return $this;
	    }

	    /**
	     * @return mixed
	     */
	    public function getFrom() {
	        
	        return $this->from;
	    }

	    /**
	     * @param mixed $from
	     *
	     * @return self
	     */
	    public function setFrom($from) {
	        
	        $this->from = $from;

	        return $this;
	    }

	    /**
	     * @return mixed
	     */
	    public function getSubject() {

	        return $this->subject;
	    }

	    /**
	     * @param mixed $subject
	     *
	     * @return self
	     */
	    public function setSubject($subject) {

	        $this->subject = $subject;

	        return $this;
	    }

	    /**
	     * @return mixed
	     */
	    public function getMessage() {

	        return $this->message;
	    }

	    /**
	     * @param mixed $message
	     *
	     * @return self
	     */
	    public function setMessage($message) {
	    	
	        $this->message = $message;

	        return $this;
	    }

		function __construct() {
			
			apply_filters('wp_mail_content_type', 'text/html');
			add_action('wp_ajax_send_contact', array($this, 'send_contact'));
			add_action('wp_ajax_nopriv_send_contact', array($this, 'send_contact'));
		}

		public function send_contact() {

			if (isset($_POST['email']) && !empty($_POST['email'])) {
				
				$this->to 		= get_option('admin_email');
				$this->message 	= '<!DOCTYPE html>' .
									'<html lang="pt-br">' .
									'<head>' .
										'<meta charset="UTF-8">' .
										'<title>' . $this->subject . '</title>' .
									'</head>' .
									'<body>' .
										'<table>' .
											'<tr>' .
												'<th colspan="2" style="font-weight: bold; text-transform: uppercase; padding: 30px 0 15px 0;">' .
													$this->subject .
												'<th>' .
											'</tr>';

				foreach ($_POST as $key => $value) {
					
					$this->message .= '<tr style="background: #5b5b5f; color: white;">' .
										'<td style="font-weight: bold; text-align: right; padding: 5px 10px;">' .
											$this::MAP[$key] . ':' .
										'</td>' .
										'<td style="padding: 5px 10px;">' .
											$value .
										'</td>' .
									'</tr>';
				}

				$this->message .= 		'</table>' .
									'</body>' .
								'</html>';

				return wp_mail($this->to, $this->subject, $this->message, $headers);
			}
		}
	}

	new Form();
?>
