import React from 'react';

interface LanguageSelectorProps {
currentLang: string;
onChangeLanguage: (lang: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ currentLang, onChangeLanguage }) => {
return (
<div className="absolute top-4 right-4 z-50">
<select
value={currentLang}
onChange={(e) => onChangeLanguage(e.target.value)}
className="bg-white/70 text-black rounded px-2 py-1 shadow"
>
<option value="en">English</option>
<option value="de">Deutsch</option>
<option value="fr">Français</option>
</select>
</div>
);
};

export default LanguageSelector;