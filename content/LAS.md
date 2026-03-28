---
aliases: [Listen, Attention and Spell]
---
# LAS
음성인식을 위해서 구글이 제안한 방식으로 Encoder가 Listen역할을 하고 그 다음에 attention 모듈 그리고 디코더가 Spell 역할을 하는 구조로 이루어짐 기계번역에 사용되는 모듈을 그대로 이용하여 음성인식에 사용한 구조임. 인코더는 Bidirectional LSTM이므로 On-line 실시간 처리에는 부적합함.[^1]
[^1]: [[쉽게 활용하는 인공지능 비즈니스]]