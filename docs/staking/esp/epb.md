---
id: epb
sidebar_position: 2
---

# Early Participant Bonus

Early Staking Pool에서는 세일즈 참여에 따른 추가적인 수익을 제공하기 위해 아래와 같이 EPB/DCR 등의 장치를 사용합니다.

---

### Early Participant Bonus

<!-- 이 문서에서는 편의상 세일즈(토큰 판매)를 다음과 같이 구분하여 분류합니다. 

+ Token Sales Stage
    + 초기 세일즈 : 프로젝트가 가동되기 위한 최소 조건인, 최초 5,000,000개 까지의 KASH 판매
    + 추가 세일즈 : 초기 세일즈 이후 5,000,000개의 KASH 판매. 즉, 5,000,001번째 ~ 10,000,000번째 KASH 판매까지
    + 기타 발행량 : 시장 상황에 따라 PoL 혹은 RBS에 의한 가격 안정화를 위해 채권 시장을 통해 발행한 KASH

Early Staking Pool은 이 중 더 불확실성이 높고, 프로젝트에 보다 큰 공헌을 한 초기 세일즈 참여자들에 대해 최대한의 보상 분배를, 추가 세일즈 참여자에게도 합리적인 수준의 보상을 지급 하는 것에 초점을 두고 설계 되었습니다. -->

프로토콜은 각 세일즈 참여자들에게 그 참여 시기(판매량 기준)에 따라 EPB라는 값을 부여합니다. 판매량이 낮은 초기에 참여한 사용자들일수록, 높은 리스크에 걸맞은 높은 EPB를 부여합니다.

+ $EPB$, Early Participant Bonus : 세일즈 참여 시기에 따른 보너스 배율
    $$
    EPB_{q} = A / (q + k)^2 + C
    $$
    + $q$ : 세일즈의 진행 상황 (판매량, KASH)
    + $k, A, C$ : 아래 조건을 달성하는 EPB 곡선을 구성하는 상수, 각 스테이킹 풀 별로 상이
        + 단조 감소 : $q_1<q_2 \implies EPB_{q1} \ge EPB_{q2}$
        + 목표 배율 : $EPB_0 = a$, $EPB_{5m} = b + \epsilon$
            + $a$ : 세일즈 초기의 최대 배율
            + $b$ : 세일즈 후기의 최소 배율
        + 정적분 : $\int_{0}^{5m} EPB_q \, dq = c - \epsilon$
            + $c$ : 세일즈를 통해 발행할 지분 총량
        + 소수점 오차 : $0< \epsilon ≪ 1$
    
+ $E(EPB)$ : 참여시기와 구매량을 고려한 실질적인 사용자의 최종 EPB.
    $$
    E(EPB) = \frac{1}{q_a - q_b} \int_{q_b}^{q_a} EPB_q \, dq
    $$
    + $q_b$ : 사용자가 토큰을 구매하기 전의 판매량
    + $q_a$ : 사용자가 토큰을 구매하고난 후의 판매량
    + 문서 내 사용자의 EPB 혹은 (판매량 가중, 적분) 평균 EPB 등은 이 E(EPB)를 뜻합니다.

이는 프로토콜이 참여자에게 제공하고자 목표하는 수익률을 의미하며, 실질적으로는 아래 DCR 등을 활용하여 가상의 지분을 지급하여 실현됩니다.

---

### Debt Creation Right

세일즈 참여자들은 구매량과 EPB에 비례해 부채를 만들 수 있는 권리인 DCR을 얻게 됩니다. 이 권리는 스테이킹에 토큰을 예치할 때 사용하여, 부채로 이루어진 가상의 지분을 부여받아 보상에 대한 지분율이 증가하는 효과를 얻을 수 있습니다.

+ $DCR$, Debt Creation Right : 부채를 만들 수 있는 권리
    $$
    DCR_q := EPB_q - 1
    $$
    + DCR은 보상 수익을 위한 추가 장치입니다. 예치 원금에 대해서도 보상을 받을 것이므로, 목표치에 맞추기 용이하도록 DCR 곡선을 EPB-1로 정의합니다.
    $$
    DCR_{earn} = \int_{q_b}^{q_a} (EPB_q - 1) \, dq = (E(EPB) - 1) \times Amount_{buy}
    $$
    + $Amount_{buy}$ = q_a - q_b$ : 세일즈 참여자가 구매한 토큰 수량
    + $DCR_{earn}$ : 세일즈 참여자가 토큰 구매로 받는 DCR 수량

<!-- 📌 추가 세일즈 참여자의 경우 현재의 Early Staking Pool에서 DCR을 행사할 기회가 없을 수 있습니다. 아래 Priority Reservation 파트를 반드시 참고하세요. -->

---

### EPB / DCR Graph

다음은 Early Staking Pool의 현재 설정값 상에서 판매량(q)에 따른 EPB와 그에 따라 발급되는 "누적" DCR을 시각화 한 그래프입니다.

![KASH EPB Graph](/img/kash_staking_epb.png)

+ q는 1,000,000 KASH 단위입니다.