// const urls = ["/1", "/2", "/3", "/4"];

// const tasks = urls.map((url) => () => fetch(url));

// const data = await runWithLimit(tasks, 2);

/* 
You are given:
    - An array of URLs
    - A function fetch(url) that returns a Promise
Implement
- Concurrency limit
    At most limit requests should be in-flight at any time
- Start ASAP
    As soon as one request finishes, start the next one immediately
- Preserve order
    The final result array should match the order of input URLs
- Return results
    Return a Promise that resolves to:
*/

export const runWithLimit = async <T>(
  tasks: Array<() => Promise<T>>,
  limit: number,
): Promise<T[]> => {
  if (limit <= 0) return [];

  let index = 0;
  const results: T[] = new Array(tasks.length);

  const worker = async () => {
    while (true) {
      const currentIndex = index++;
      if (currentIndex >= tasks.length) return;
      results[currentIndex] = await tasks[currentIndex]();
    }
  };

  await Promise.all(new Array(limit).fill(undefined).map(worker));
  return results;
};
