const tests = [];

export function test(name, fn) {
  tests.push({ name, fn });
}

export function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

export async function run(container) {
  let pass = 0;
  let fail = 0;
  for (const item of tests) {
    try {
      await item.fn();
      pass += 1;
      container.insertAdjacentHTML("beforeend", `<li class="pass">✅ ${item.name}</li>`);
    } catch (error) {
      fail += 1;
      container.insertAdjacentHTML("beforeend", `<li class="fail">❌ ${item.name}<br>${error.message}</li>`);
    }
  }
  return { pass, fail, total: tests.length };
}
