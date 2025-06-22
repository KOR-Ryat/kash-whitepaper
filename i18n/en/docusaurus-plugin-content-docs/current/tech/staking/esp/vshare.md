---
id : vshare
sidebar_position: 2
---

# Virtual Share

EPB에 의해 발급된 DCR이 실제 보상에 영향을 주는 것은 가상 지분이라는 개념을 통해 구현됩니다.

---

### Virtual Share

사용자는 예치시 DCR을 소모하여 1 DCR당 1 KASH 가치로 환산한 만큼 가상 지분을 발급 받을 수 있습니다. 사용한 DCR 가치 만큼의 부채가 동시에 발생하여, 추후 지분을 청산할 때에 다시 상환해야 합니다. 

+ Virtual Share : DCR에 의해 추가로 발행된 가상 지분입니다. 
    $$
    Share_{virtual} = DCR_{used} \, / \, Price_{share}
    $$
    $$
    Debt_{new} = Debt_{old} + DCR_{used}
    $$
    
즉 가상 지분의 의의는, 이후 보상의 누적에 의한 지분의 가치 상승분을 차익으로 얻을 수 있는데 있습니다. 혹은 더 많은 예치액을 예치하여 더 많은 지분을 가진 것처럼 이자를 받을 수 있다고 해석해도 동일한 의미입니다.

+ Weighted Share : 가상 지분을 포함한 가중 지분입니다. Early Staking Pool에서는 이 가중 지분이 보상 분배의 기준이 됩니다.
    $$
    Share_{weighted} = Share_{principle} + Share_{virtual}
    $$
    + $Share_{principle}$ : 예치 원금에 의해 발행된 순지분

---

### Max Leverage

발급 받은 DCR을 제한 없이 모두 행사할 수 있는 것은 아닙니다. 구매 수량과 발급받은 DCR 개수에 비례하여 최대 부채율(레버리지)가 제한되어 있습니다. 이는 아주 소량의 KASH만 예치하고 DCR만 행사하여 불공정한 형태로 보상을 받는 행위를 방지하기 위한 장치입니다. 

+ User Leverage : 특정 유저의 순지분에 비해 총 지분(예치액 규모)이 얼마나 많은가
    $$
    Leverage_{user} = \frac{Share_{weighed}}{Share_{principle}}
    $$

+ User Max Leverage : 유저가 DCR을 통해 가질 수 있는 최대 레버리지
    $$
    MaxLeverage_{user} = \frac{\sum{DCR_{earned}}}{\sum{Amount_{bought}}} + 1
    $$
    + $\sum{DCR_{earned}}$ : 해당 유저가 수령한 DCR 총량
    + $\sum{Amount_{bought}}$ : 해당 유저가 구매한 KASH 총량

+ Exercisable DCR : 레버리지를 고려해 행사 가능한 DCR 크기
    $$
    Share_{virtual, limit} = (MaxLeverage_{user} - 1) \times (Share_{principle} + \frac{Amount_{deposit}}{Price_{share}})
    $$
    + $Amonut_{deposit}$ : (선택 사항) DCR 행사시 함께 예치할 금액
    + $Share_{virtual, limit}$ : 순지분과 최대 레버리지에 비례한 가상 지분의 한도
    $$
    DCR_{exercisable} = 
    \begin{cases}
        0 & (Share_{virtual, limit} <= Share_{virtual}) \\
        (Share_{virtual, limit} - Share_{virtual}) \times Price_{share}  & (else)
    \end{cases}
    $$

일반적으로는 이러한 수식을 모두 이해할 필요 없이, 세일즈로 구매한 토큰을 전부 예치하면 해당 구매로 발급받은 DCR을 모두 행사 가능합니다.

---

### Formula Modification

Early Staking Pool에서는 이 가상 지분 개념을 도입함으로써 다음과 같은 몇가지 차이점이 있습니다.

+ 일반적인 스테이킹 풀에서 Share가 사용되는 몇가지 장소, 특히 보상 계산시에 Weighted Share가 사용됩니다.
+ 스테이킹 풀의 Pool Balance에 사용자에게 회수할 Debt만큼 더 존재한다고 가정합니다.

이를 적용하여 아래와 같이 몇가지 수식이 변경됩니다.

+ Share Price : 각 지분 하나가 나타내는 가치입니다. 진입시나 청산시 이 가격을 기준으로 KASH와 교환됩니다.
    $$
    Price_{share} = \frac{
        \sum Principle_{All users} + 
        \sum Debt_{\text{All users}} + 
        \sum Reward_{\text{All epochs}}
    }{\sum\limits_{user \in U_{pool}} Shares_{weighted, user}}
    $$
    + $\sum Principle_{All users}$ : 스테이킹한 유저들의 원금 총액입니다.
    + $\sum Debt_{\text{All users}}$ : 스테이킹한 유저들의 부채 총량입니다.
    + $\sum Reward_{\text{All epochs}}$ : 스테이킹 풀에 실현된 보상 총량입니다.
    + $\sum\limits_{user \in U_{pool}} Shares_{weighted, user}$ : 스테이킹한 유저들의 가중 지분 총량입니다.

+ Withdrawable Balance : 출금시에는 지분을 소각하고 KASH로 변환합니다. 그 중에서 부채를 제외한 만큼이 인출 가능 총액이 됩니다.
    $$
    Amount_{Withdrawable} = Share_{weighted} \times Price_{share} - Debt
    $$
    + 부분 인출시 유저는 현재의 레버리지를 유지해야 합니다. 따라서 순지분과 가상 지분을 현재 비율과 동일한 비율로 소각해야하며, 부채도 동일 비율 상환해야 합니다.
    $$
    Rate_{burn} = \frac{Amount_{withdraw}}{(Share_{weighted} \times Price_{share}) - Debt_{current}}
    $$
    $$
    Share_{burn} = Amount_{withdraw} \times  \frac{Share_{weighted}}{Share_{weighted} \times Price_{share} - Debt_{current}} = Share_{weighted} * Rate_{burn}
    $$
    + $Amount_{withdraw}$ : 사용자가 인출을 희망하는 금액
    + $Share_{burn}$ : 해당 금액을 인출하기 위해 소각할 지분 수량
    + $Debt_{burn}$ : 해당 지분을 소각하기 위해 상환할 부채