---
title: "Carrying capacity"
date: 2026-04-13
tags: ["PO", "active user", "마케팅", "비즈니스", "브랜드"]
description: "Carrying Capacity는 '내 서비스가 도달할 최종적인 유저수'라고 할 수 있습니다"
---

Carrying Capacity 는 '내 서비스가 도달할 최종적인 유저수'라고 할 수 있습니다. 이 값은 서비스를 운영하고 3 ~ 6 개월 안에 알 수 있기 때문에, 제품의 성장을 미리 예측할 수 있다는 점에서 매우 중요합니다.
결국 C.C 에 영향을 주는 것은 Inflow(=New User + Ressurection)과 Churn Rate 두가지에 의해서 결정된다는 것이죠.
여기서 또 고려해야할 점은
- 서비스의 Organic Inflow 는 서비스의 특성에 따라 결정되며 일정한 숫자로 유지된다.
- Churn Rate(1-Retention Rate)은 전체 유저에 대한 일정한 비율로 유지된다.
Carrying Capacity = Of New Daily Customers / Custimers You Lost Each Day
마케팅 활동을 통해 일시적으로 Inflow Boosting 은 가능하지만 결국 광고를 끄면 그대로 다시 주저앉게 됩니다. Carrying Capacity 가 변하지 않았기 때문이죠.
결국 근본적인 Carrying Capacity 의 향상은 재품 개선을 통한 Inflow 와 Retention 향상, Churn 감소외에는 방법이 없고, 이것은 마케팅 활동으로 바뀔 수 없습니다.
본질적인 UX 를 개선하지 않는 한 이것을 향상 시키는 것은 불가능하다.

Q1. You notice that your power users all have taken some action so you try to encourage all users to fill out their profile to get them more hooked on your product. Does this actually help?
Q1. 귀하의 고급 사용자가 모두 일부 조치를 취한 것을 확인하여 모든 사용자가 귀하의 제품에 더 푹 빠지도록 자신의 프로필을 작성하도록 권장하려고 합니다. 이것이 실제로 도움이 되나요?
Without this model its easy to mislead yourself into thinking it helps. You will probably be able to increase the metric but it may just weaken the correlation with power users. However, with this model you just watch your loss % eachday and if it doesn't change then you haven't had any net impact on retention.
이 모델이 없으면 도움이 된다고 착각하기 쉽습니다. 메트릭을 늘릴 수는 있지만 고급 사용자와의 상관 관계가 약해질 수 있습니다. 그러나 이 모델을 사용하면 매일 손실률을 관찰할 수 있으며 변경되지 않으면 유지율에 대한 순 영향이 없습니다.

**Q2.**

You have 24 hours of downtime, the next day you come back up your traffic is down. Will this have a long-term effect you need to worry about?

-> Even if your traffic is lowered for a few days, all you have to do is measure your new visitors per day & lost customers per day and you'll see if your carrying capacity has changed. If it has not changed then you don't have to worry, you know your traffic will rise back up to your carrying capacity.

**Q3.** 

You have 100K uniques per day and so does your competitor, but are these 100K people who come back everyday or 700K people who each come once per week? Does it matter?

-> If you're incorrectly caught up in # of unique visitors per day then this does seem like an important thing. And in fact, if you realize your visitors are not returning as often as your competitors you may even be tempted to spam them regularly because this will increase # of unique visitors each day and can give you the illusion of improving things. In reality a move like this would probably increase your % lost each day and hurt your carrying capacity but you wouldn't notice this for a while because the increased # of uniques each day would mask the harm.
However, with the model your emphasis on # of customers not # of visitors. You'll quickly realize that you don't care how frequently people visit as a primary factor; if it doesn't impact # of new customers per day or % of lost per day then you haven't actually helped your product.

Q4. You turn on a new ad campaign and see your # of unique visitors per day start to increase, you assume that this will continue increasing so long as you keep the ads running, right?
-> Nope, you'll level off once you've reached your new carrying capacity.

Q5. You start having email deliverability problems so you can’t notify users of new activity on the site. The # of unique visitors decreases slightly but you’re not too worried, should you be?
-> This is similar to question 3, it may or may not be important but you'll quickly be able to tell by focusing on the core numbers. Increasing # of unique visitors per day does not necessarily lead to more total customers.

## 데이터 그로스 모델링
1. Total Customer 는 New Customer Today 와 Lost Customers Today, 단 두 가지 요소만 영향을 미친다.

2. Customer 에 대한 정의

    A. active 를 어떻게 정의하나.

        i. 95% 이상의 Visitor 가 꼭 하게 되는 활동

        ii. Page by Page, Repetable 하고 Meaningful 한 Action 인가?

    B. Churn 은 어떻게 정의하나?  
        i. 얼마를 안써야 안오는 거라고 정의할까? 1 일? 4 일?

        ii. 상식적으로 이 정도를 안썼으면 Loss 될 것 같다를 정한다 (나중에 바꾸면 안됨)

            - ex. 샤잠 : 한 달에 한 번 쓰는 앱. 3 개월을 Churn 으로 정의

            - 토스 송금은? 30%가 이전달에 온 적이 없는 유저



제품의 본질적인 체력(마케팅, 광고가 제외된)

Q1 : 현재 MAU 10 만, Carrying Capacity 75 만, 광고를 해야할까?

Q2 : 현재 MAU 70 만, Carrying Capacity 75 만, 광고를 해야할까?

Q3 : 현재 MAU 100 만, Carrying Capcity 75 만, MAU 는 떨어질까?


마케팅 활동을 통해 일시적으로 Inflow Boosting 은 가능하지만, 결국 광고를 끄면 그대로 다시 주저앉게 됩니다. Carrying Capacity 가 변하지 않았기 때문이죠.

결국 근본적인 Carrying Capacity 의 향상은 제품 개선을 통한 Inflow 와 Retention 의 향상, Churn 감소 외에는 방법이 없고, 이것은 마케팅 활동으로는 바꿀 수 없습니다.

Carrying Capacity 는 '내 서비스가 도달할 최종적인 유저수'라고 할 수 있습니다. 이 값은 서비스를 운영하고 3~6 개월 안에 알 수 있기 때문에, 제품의 성장을 미리 예측할 수 있다는 점에서 매우 중요합니다.

결국 C.C 에 영향을 주는 것은 Inflow(=New User + Ressurrection)과 Churn Rate 두 가지에 의해서 결정된다는 것이죠.

여기서 또 고려해야 할 점은

- 서비스의 Organic Inflow 는 서비스의 특성에 따라 결정되며 일정한 숫자로 유지된다.

- Churn Rate (1 - Retention Rate)은 전체 유저에 대해 일정한 비율로 유지된다.

https://www.aladin.co.kr/shop/wproduct.aspx?ItemId=20648680
린 스타트업
