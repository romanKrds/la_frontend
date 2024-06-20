export const getColorById = (id: number): string => {
    const colors: string[] = [
      '#b875de', '#4b77be', '#60d595', '#6657d2', '#60a3bc', '#4a69bd', '#e55039', '#0a3d62',
      '#ff6b81', '#1e90ff', '#474787', '#2ed573', '#ff793f', '#ff5252', '#aaa69d', '#f78282',
      '#6b9aff', '#2abb9b', '#db7093', '#66cdaa', '#51ab63',
    ];

    return colors[id % colors.length];
  }

export const setToLocalStorage = (data: Record<string, string>) => {
  for (const key in data) {
    localStorage.setItem(key, data[key]);
  }
}

export const getFromLocalStorage = (key: string): string | null =>
  localStorage.getItem(key)

export const getAuthToken = (): string | null => getFromLocalStorage('token');


export const randomNumber = (ceil: number) => Math.floor(Math.random() * (ceil + 1))

export const shuffleArray = <T>(array: T[]): T[] => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = randomNumber(i); // random index from 0 to i
        [array[i], array[j]] = [array[j], array[i]]; // swap elements
    }

    return array;
}
