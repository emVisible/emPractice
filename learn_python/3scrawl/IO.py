import os
import time
import socket
from urllib.parse import urlparse
from selectors import DefaultSelector, EVENT_READ, EVENT_WRITE

urls = ['https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9bc51bc53f634bf79b5de5c8b9810817~tplv-k3u1fbpfcp-watermark.image',
        'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2b95ac8571ba403180743495ed56e492~tplv-k3u1fbpfcp-watermark.image',
        'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/459c6c73887a4206a33b13ef23988809~tplv-k3u1fbpfcp-watermark.image',
        'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/80701ade82d345cd8aa0b08fef008fe1~tplv-k3u1fbpfcp-watermark.image',
        'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/99855ed1f79c456f9fdcd83ce5cff4f2~tplv-k3u1fbpfcp-watermark.image',
        'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0c4bd38c2fe3434587025748d051362e~tplv-k3u1fbpfcp-watermark.image',
        'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/80cd2a1d165b43beb6234d893ce391e2~tplv-k3u1fbpfcp-watermark.image',
        'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ea18df95f26f4314a0a36d11d4a067d0~tplv-k3u1fbpfcp-watermark.image',
        'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/095c342a796c411cad1800396746bdaf~tplv-k3u1fbpfcp-watermark.image',
        'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d3769e4d468a4f64a1e2879f94ad742b~tplv-k3u1fbpfcp-watermark.image'
]
length = len(urls)

selector = DefaultSelector()

class Signal:
  def __init__(self) -> None:
    self.signal = False

signal = Signal()

class Crawler:
  def __init__(self, url) -> None:
    self.url = urlparse(url)
    self._url = url
    self.data = b''
    self.sock = socket.socket()
    self.sock.setblocking(False)
  '''
    连接服务器, 注册读取事件
  '''
  def fetch(self):
    try:
      self.sock.connect((self.url.netloc, 80))
    except BlockingIOError:
      pass
    selector.register(self.sock.fileno(), EVENT_WRITE, self.writable)

  '''
    注册写入事件, 发送GET请求
  '''
  def writable(self, key):
    # 注销事件
    selector.unregister(key.fd)
    print("链接成功")

    data = f"GET {self.url.path} HTTP/1.1\r\nHOST: {self.url.netloc}\r\nConnection: close\r\n\r\n".encode()
    self.sock.send(data)
    print("发送成功")

    selector.register(self.sock.fileno(), EVENT_READ, self.readable)

  '''
    接收请求, 写入文件到本地
  '''
  def readable(self, key):
    d = self.sock.recv(102400)
    if d:
      self.data += d
    else:
      selector.unregister(key.fd)
      print(f"读取成功: {key.fd}")

      with open(f"{os.getcwd()}/IO/{self.url.path[20:]}", 'wb') as f:
        f.write(self.data.split(b'\r\n\r\n')[1])

      self.sock.close()
      urls.remove(self._url)

      if not urls:
        signal.signal = True

def loop():
  while not signal.signal:
    events = selector.select()

    print(events)

    for event_key, _ in events:
      callback = event_key.data
      callback(event_key)

def main():
  start_time = time.time()
  for url in urls:
    crawler = Crawler(url)
    crawler.fetch()
  loop()
  end_time = time.time()
  consume_time = end_time - start_time
  print(f"耗时: {consume_time} s")
  print(f"平均耗时: {consume_time / length} s")

if __name__ == '__main__':
  main()


