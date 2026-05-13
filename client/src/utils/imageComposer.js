import html2canvas from 'html2canvas';

export async function captureGreetingCard(elementId) {
    const element = document.getElementById(elementId);
    if (!element) throw new Error('Element not found');

    const canvas = await html2canvas(element, {
        useCORS: true,
        allowTaint: false,
        scale: 2,
        backgroundColor: null,
    });

    return new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
            if (blob) resolve(blob);
            else reject(new Error('Canvas export failed'));
        }, 'image/png');
    });
}

export async function shareGreetingCard(elementId, userName) {
    const blob = await captureGreetingCard(elementId);
    const file = new File([blob], `${userName}-greeting.png`, { type: 'image/png' });

    if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({
            title: 'My Greeting from GreetFlow',
            text: `A greeting made with GreetFlow`,
            files: [file],
        });
        return 'shared';
    } else {
        // Fallback: download
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${userName}-greeting.png`;
        a.click();
        URL.revokeObjectURL(url);
        return 'downloaded';
    }
}
