'''
  同步阻塞爬虫
'''
import time
import pathlib
from urllib.parse import urlparse
import socket

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

class Scrawl:
  def __init__(self, url) -> None:
    self.url = url
    self.data = b''
    self.sock = socket.socket()
  def fetch(self):
    url = urlparse(self.url)
    # 通过80端口链接网址
    self.sock.connect((url.netloc, 80))
    print("[System] 链接成功")

    data = f"GET {url.path} HTTP/1.1\r\nHOST: {url.netloc}\r\nConnection: close\r\n\r\n"
    # 发送请求
    self.sock.send(data.encode())

    # 接收数据
    while True:
      d = self.sock.recv(1024)
      if d:
        self.data += d
      else:
        print("接收成功")
        break
    # 文件操作
    print(url.path)
    with open(f"{pathlib.Path().cwd()}\\pictures\\{url.path[20:]}", 'wb') as f:
      f.write(self.data.split(b'\r\n\r\n')[1])
    print("[System] 文件保存成功")
    self.sock.close()

def main():
  start_time = time.time()
  index = 1
  for url in urls:
    scrawl = Scrawl(url)
    scrawl.fetch()
    print(f"[System] 已完成第{index}个获取")
    index += 1
  end_time = time.time()
  consume_time = end_time - start_time
  print(f"耗时: {consume_time} s")
  print(f"平均耗时: {consume_time / index} s")

if __name__ == '__main__':
  main()
