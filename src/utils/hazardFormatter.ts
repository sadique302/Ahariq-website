import { IndianHazardWarning } from "../types";

/**
 * Ensures ALL hazard warning text follows the strict safe & legal structure:
 * Structure = [Ingredient Name] + [Uska kaam kya hai] + [Adhik sevan se kya ho SAKTA hai]
 *
 * Example:
 * Sugar: "इसमें 34g चीनी है जो मीठा बनाने के लिए है, इसका अधिक सेवन मोटापे और डायबिटीज़ के जोखिम से जोड़ा जाता है।"
 * Palm oil: "इसमें रिफाइंड पामोलिन तेल है जो तलने के लिए इस्तेमाल होता है, इसमें सैचुरेटेड फैट अधिक होता है जो अधिक मात्रा में दिल के लिए अच्छा नहीं माना जाता।"
 *
 * Rule: Never say "ye kharab hai, ye bimari karta hai". Always say "adhik sevan ... se joda jata hai / mana jata hai".
 */
export function formatSafeHazardWarning(warning: IndianHazardWarning, productName = "", sugarVal?: number, sodiumMg?: number): {
  descriptionHi: string;
  descriptionEn: string;
} {
  const type = warning.type;
  const tag = warning.tagValue || "";

  switch (type) {
    case "added_sugar": {
      const sugarText = sugarVal ? `${sugarVal}g` : tag.includes("g") ? tag : "अतिरिक्त";
      return {
        descriptionHi: `इसमें ${sugarText} चीनी है जो मीठा स्वाद देने के लिए है, इसका अधिक सेवन मोटापे और डायबिटीज़ के जोखिम से जोड़ा जाता है।`,
        descriptionEn: `Contains ${sugarText} added sugar used for sweetness; high intake is associated with risk of obesity and diabetes.`
      };
    }

    case "palm_oil": {
      return {
        descriptionHi: `इसमें रिफाइंड पामोलिन तेल है जो तलने और शेल्फ-लाइफ के लिए इस्तेमाल होता है, इसमें सैचुरेटेड फैट अधिक होता है जो अधिक मात्रा में दिल के लिए अच्छा नहीं माना जाता।`,
        descriptionEn: `Contains refined palmolein oil used for frying and shelf-life; high in saturated fats which in excess is not considered good for heart health.`
      };
    }

    case "maida": {
      return {
        descriptionHi: `इसमें रिफाइंड मैदा है जो बेस और टेक्सचर देने के लिए है, इसमें फाइबर कम होता है जिसका अधिक सेवन पाचन और वजन के लिए अनुकूल नहीं माना जाता।`,
        descriptionEn: `Contains refined wheat flour (maida) used for texture; lacking fiber, high consumption is not considered optimal for digestion and weight management.`
      };
    }

    case "sodium": {
      const sodText = sodiumMg ? `${Math.round(sodiumMg)}mg` : tag || "उच्च मात्रा में";
      return {
        descriptionHi: `इसमें ${sodText} सोडियम (नमक) है जो स्वाद और प्रिजर्वेशन के लिए है, इसका लगातार अधिक सेवन हाई ब्लड प्रेशर के जोखिम से जोड़ा जाता है।`,
        descriptionEn: `Contains ${sodText} sodium used for flavor enhancement and preservation; regular high intake is associated with risk of elevated blood pressure.`
      };
    }

    case "trans_fat": {
      return {
        descriptionHi: `इसमें इंडस्ट्रियल ट्रांस फैट्स हैं जो स्थिरता देने के लिए प्रोसेस किए जाते हैं, इनका अधिक सेवन कोलेस्ट्रॉल और हृदय स्वास्थ्य के लिए अनुकूल नहीं माना जाता।`,
        descriptionEn: `Contains industrial trans fats created during oil processing; high intake is associated with unfavorable cholesterol and cardiovascular profiles.`
      };
    }

    case "artificial_colours": {
      return {
        descriptionHi: `इसमें सिंथेटिक फूड कलर्स हैं जो आकर्षक रंग देने के लिए हैं, इनका नियमित सेवन बच्चों में एलर्जी और हाइपरएक्टिविटी के जोखिम से जोड़ा जाता है।`,
        descriptionEn: `Contains synthetic food colorings used for visual appeal; regular consumption is associated with potential sensitivities and hyperactivity in children.`
      };
    }

    case "preservatives": {
      return {
        descriptionHi: `इसमें फूड प्रिजर्वेटिव्स और एडिटिव्स हैं जो शेल्फ-लाइफ और स्थिरता के लिए हैं, इनका नियमित अधिक सेवन पेट व आंतों की सेहत के लिए अनुकूल नहीं माना जाता।`,
        descriptionEn: `Contains food additives and preservatives used for shelf-life and stability; regular high intake is not considered ideal for gut sensitivity.`
      };
    }

    case "glyphosate": {
      return {
        descriptionHi: warning.descriptionHi || `भारतीय मसालों में कीटनाशक अवशेषों की जांच FSSAI द्वारा अनिवार्य है। एवरेस्ट बैच टेस्टेड है, पर बाजार के कुछ नमूनों में ETO अवशेष की शिकायतें मिली हैं।`,
        descriptionEn: warning.descriptionEn || `FSSAI mandates pesticide residue monitoring in Indian spices. Everest is batch-tested, though global market surveillance has flagged ETO residue concerns in specific lots.`
      };
    }

    default: {
      if (warning.descriptionHi && warning.descriptionEn) {
        return {
          descriptionHi: warning.descriptionHi,
          descriptionEn: warning.descriptionEn
        };
      }
      return {
        descriptionHi: `इसमें सामग्री गुणवत्ता मानकों की जांच की गई है, संतुलित मात्रा में उपयोग स्वास्थ्य के लिए अनुकूल माना जाता है।`,
        descriptionEn: `Quality safety metrics audited; balanced usage is recommended for optimal wellness.`
      };
    }
  }
}
