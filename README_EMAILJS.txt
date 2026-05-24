CONFIGURATION EMAILJS - AB Technologie Solution

Dans app.js, remplace :

const EMAILJS_PUBLIC_KEY = 'REMPLACE_PAR_TA_PUBLIC_KEY';
const EMAILJS_SERVICE_ID = 'service_awb5pmj';
const EMAILJS_TEMPLATE_ID = 'template_7xcmars';

Par tes vraies valeurs EmailJS.

Variables à mettre dans ton template EmailJS :

{{to_email}}
{{from_name}}
{{from_email}}
{{phone}}
{{project_type}}
{{main_need}}
{{budget}}
{{message}}
{{reply_to}}
{{subject}}

Exemple de contenu du template :

Nouvelle demande de soumission

Nom : {{from_name}}
Email : {{from_email}}
Téléphone : {{phone}}
Type de projet : {{project_type}}
Besoin principal : {{main_need}}
Budget : {{budget}}

Message :
{{message}}

Répondre à : {{reply_to}}

IMPORTANT : dans EmailJS, mets To Email = {{to_email}} ou directement abtechnologiesolution@gmail.com.
