export const getColorById = (id: number): string => {
    const colors: string[] = [
      '#b875de', '#4b77be', '#60d595', '#6657d2', '#60a3bc', '#4a69bd', '#e55039', '#0a3d62',
      '#ff6b81', '#1e90ff', '#474787', '#2ed573', '#ff793f', '#ff5252', '#aaa69d', '#f78282',
      '#6b9aff', '#2abb9b', '#db7093', '#66cdaa', '#51ab63',
    ];

    return colors[id % colors.length];
  }