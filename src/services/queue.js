function mapQueue(queue) {
  const arr = [];
  for (let i = queue.front; i !== queue.rear; i = (i + 1) % queue.size) {
    arr.unshift(queue.users[i]);
  }
  arr.unshift(queue.users[queue.rear]);
  return arr;
}

export default mapQueue;
