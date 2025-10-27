export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export function calculateDuration(startDate: string, endDate?: string): string {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();

  const months = (end.getFullYear() - start.getFullYear()) * 12 +
                 (end.getMonth() - start.getMonth());

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (years === 0) {
    return `${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
  }

  if (remainingMonths === 0) {
    return `${years} year${years !== 1 ? 's' : ''}`;
  }

  return `${years} year${years !== 1 ? 's' : ''}, ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
}

export function scrollToSection(sectionId: string) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Add highlight effect
    element.classList.add('ai-highlight');

    // Remove the class after animation completes
    setTimeout(() => {
      element.classList.remove('ai-highlight');
    }, 1500);
  }
}

export function extractNavigationCommand(text: string): string | null {
  const match = text.match(/\[NAVIGATE:(\w+)\]/);
  return match ? match[1] : null;
}

export function removeNavigationCommand(text: string): string {
  return text.replace(/\[NAVIGATE:\w+\]/g, '').trim();
}

export async function playAudioFromBase64(base64Audio: string) {
  const audio = new Audio(`data:audio/mp3;base64,${base64Audio}`);
  await audio.play();
  return audio;
}

export function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      // Remove data:audio/webm;base64, prefix
      resolve(base64.split(',')[1]);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
