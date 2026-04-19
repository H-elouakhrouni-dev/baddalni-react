import * as nsfwjs from 'nsfwjs';

let model = null;

const loadModel = async () => {
    if (!model) {
        model = await nsfwjs.load();
    }
    return model;
};

loadModel().catch(() => console.warn('NSFWJS failed to preload in background.'));

export const simulateAIScan = async (url) => {
  if (!url || typeof url !== 'string') return { safe: true };

  try {
    const activeModel = await loadModel();

    return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = 'anonymous'; 
        
        img.onload = async () => {
            try {
                const predictions = await activeModel.classify(img);
                
                const unsafeClasses = ['Porn', 'Hentai', 'Sexy'];
                let isUnsafe = false;

                for (let prediction of predictions) {
                    if (unsafeClasses.includes(prediction.className) && prediction.probability > 0.4) {
                        isUnsafe = true;
                        break;
                    }
                }

                if (isUnsafe) {
                    resolve({ safe: false, reason: 'Inappropriate visual content definitively detected by the AI Image Scanner.' });
                } else {
                    resolve({ safe: true });
                }
            } catch (err) {
                console.error("Classification error:", err);
                resolve({ safe: true }); 
            }
        };

        img.onerror = () => {
            resolve({ safe: false, reason: 'Image failed to load securely due to an invalid format or a broken link.' });
        };

        img.src = url;
    });

  } catch (error) {
     console.error("Model load error, falling back to simple keywords", error);
     const lowerUrl = url.toLowerCase();
     const bannedKeywords = ['naked', 'nude', 'porn', 'nsfw', 'sex', 'xxx', 'explicit', 'adult', 'bikini', 'swimsuit', 'gore'];
     for (const word of bannedKeywords) {
       if (lowerUrl.includes(word)) return { safe: false, reason: 'Inappropriate URL keyword detected.' };
     }
     return { safe: true };
  }
};
