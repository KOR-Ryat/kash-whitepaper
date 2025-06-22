---
id: valuation
sidebar_position: 1
---

# Valuation Model

KASH 토큰의 가치는 리저브 볼트의 미래 가치와 스테이킹 이자에 대한 잠재력을 기반으로 평가됩니다. 여기에 시간에 따른 프로젝트의 위험도 변화와 화폐의 시간 가치를 반영하여 현재 시점의 가치를 산출합니다.

---

### Gold Price

프로젝트는 금 가격이 장기적으로 상승하리라 생각하지만, 이를 낙관적으로 예측하여 수식에 포함하지 않았습니다. 내재가치의 평가 및 할인 계수의 계산 등 가치 환산이 필요한 경우에는 평가 시점의 금 가격을 그대로 사용합니다.

+ $P_{gold, t}$ : 시점 t의 금 가격 (USD/oz)

예를 들어, 아래 액면가 계산에 있어 "미래 볼트 가치"는 "미래에 선도될 금 수량"을 예측하되 가치는 "현재의 금 가격"을 곱해 계산합니다.

---

### Face Value

KASH 토큰의 가치를 평가하는 가장 기초적인 지표는 액면가(Face Value, FV)입니다.

+ $FV$ : 볼트의 vRWA 계약이 모두 실현되었을 때 KASH 토큰 하나가 미래에 가지게 될 가치를 의미합니다.
    $$
    FV_t = \frac{EVV_t}{Supply_{total}}
    $$
    + $Supply_{total}$ : KASH의 총 발행량 (Total Supply, KASH)
    + $EVV$, Expected Vault Value : 미래 예상 볼트 가치. 볼트 내에 이미 존재하는 자산과 미래에 실현될 가치를 합산한 값 (USD)
        $$
        EVV_t = CVV_t + {Gold_F}_t \times P_{gold, t}
        $$
        + $CVV$, Current Vault Value : 현재 볼트에 실현된 가치 (USD)
        + $Gold_F$ : 미래에 금 가치에 준하는 자산과 치환될, 볼트에 남아있는 vRWA (ozt)

---

### Intrinsic Value

KASH를 통해 얻을 수 있는 가치까지 포함한 내재가치(Intrinsic Value, IV)입니다. 1기 현재는 예상 스테이킹 수익만 고려하여 계산합니다.

+ $IV$ : 미래에 얻을 것으로 기대되는 추가적인 가치를 고려한 KASH 가치입니다. 개별 토큰의 실질 수익성이 아닌 토큰 전체의 평균으로 책정합니다.
    $$
    IV_t = FV_t \times \text{Expected\_Rebase}_t
    $$
    + ExpectedRebase_t: 현재의 KASH 하나가 스테이킹 수익률을 반영하였을 때, 프로젝트 종료 시점 예상되는 KASH 수량
        $$
        \text{Expected\_Rebase}_t = 1 + (\sum_{k = Epoch(t)}^{N_{Epochs}} Reward_{epoch,k}) / Supply_{circulating,t}
        $$
        + $Epoch(t)$ : 시점 t의 Epoch 회차
        + $Supply_{circulating,t}$ : 보수적으로 산정한 시점 t의 최대 유통량. 언제든 언스테이킹 할 수 있는 스테이킹 예치 및 보상은 포함하되, 1기 종료까지 시장에 유통될 수 없는 보험, 팀, 운영 풀 분배 물량은 제외한다
            $$
            Supply_{circulating,t} = Supply_{sales,t} + Supply_{reward,t} + Supply_{liquidity,t}
            $$
            + $Supply_{sales,t}$ : 초기 세일즈에 의해 판매된 KASH 토큰
            + $Supply_{reward,t}$ : 스테이킹 보상으로 분배된 KASH 토큰
            + $Supply_{liquidity,t}$ : PoL을 위한 채권 시장을 통해 유통된 KASH 토큰

---

### Discounting Future Values

미래에 실현될 가치는 현재 시점에서 시간과 위험 요소를 고려한 할인을 적용하여 평가됩니다. KASH는 두 가지 할인 계수를 사용합니다.

1.  시간 할인 계수 (Time Discount Factor, $DF_T$) : 미래 가치를 현재 가치로 환산하기 위한 계수로, 무위험 이자율을 사용하여 계산됩니다.
    $$
    DF_{T,t} = \frac{1}{(1 + R_{RF})^n}
    $$
        + $R_{RF}$ : 무위험 연이율 (Risk-Free Interest Rate)
        + n : 평가 시점 t로부터 프로젝트 종료까지까지 잔여 기간 (년)

2.  위험 할인 계수 (Risk Discount Factor, $DF_R$) : 프로젝트의 목표 달성 불확실성에 대한 위험을 반영하는 계수입니다. 프로젝트 초기에는 위험도가 높아 할인율이 크고, 프로젝트가 진행되고 볼트의 자산 확보가 가시화될수록 위험도가 낮아지면서 할인율이 감소합니다.
    $$
    DF_{R,t} = \min(1 - BaseTrust_t, \left(\frac{CVV_t}{EVV_{final} - CRV_t}\right)^p) + BaseTrust_t \\
    0 \le BaseTrust_t \le DF_{R,t} \le 1
    $$
    + $CVV$, Current Vault Value : 현재까지 실현된 볼트 가치. vRWA가 실현되며 차츰 따라 증가합니다.
    + $EVV_{final}$: 프로젝트 종료 시점, 금이 모두 선도되었을 때의 예상 볼트 가치
    + $\text{BaseTrust}$: 프로젝트에 대한 최소 신뢰 상수. 프로젝트의 중요 단계를 기점으로 상향 조정될 수 있음 (예: 초기 0.2 $\rightarrow$ 탐사 완료 후 0.8).
    + $p$: $CVV$가 $EVV_{final}$로 수렴하는 과정에서, $DF_R$이 변화하는 민감도를 조절하는 계수 (설정값).
    + $CRV$, Current Reserve Value : 예비 물량(보험 풀, 팀 물량)의 현재 환산 가치 (USD).
        $$
        CRV_t = Min( (CIS_t + CTS_t) \times \frac{FV_{final}}{(1 + R_{RF})^n}, EVV_{final} )
        $$
            + $CIS$, Current Insurance Supply : 보험 풀 현재 토큰량 (KASH)
            + $CTS$, Current Team Supply : 팀 물량 현재 토큰량 (KASH)
            + $FV_{final}$ : 프로젝트 종료 시점의 예상 액면가 (USD/KASH)

---

### Discounted Value Metrics

이 할인 계수들을 적용하여 KASH 토큰의 각 가치는 현재 시점에서 다음과 같이 평가됩니다.

1.  할인 액면가 (Discounted Face Value, $DFV$) : 미래의 액면가(FV)를 시간 및 위험 요소를 고려하여 현재 가치로 할인한 값입니다.
    $$
    DFV_t = FV_t \times DF_{T,t} \times DF_{R,t}
    $$

2.  할인 내재가치 (Discounted Intrinsic Value, $DIV$) : 미래의 내재가치(IV)를 시간 및 위험 요소를 고려하여 현재 가치로 할인한 값입니다.
    $$
    DIV_t = IV_t \times DF_{T,t} \times DF_{R,t}
    $$

---

### Example Graph

다음은 현재 프로토콜의 설정에서 각 가치 지표가 epoch별로 어떻게 변화하는지 나타낸 예시 그래프입니다. 

![KASH Valuation Graph](/img/kash_valuation_main_no_rbs.png)

+ 무위험 연이율은 3%로 설정했고, 프로젝트 최소 신뢰 수준은 0.2에서 탐사 완료시 0.5, PCR 행사 가능시점에 0.7로 설정했습니다.
+ 가치 비교의 편의를 위해 금 가격은 Epoch 0에서 FV가 1 USD가 되도록 약 3110.4 USD/ozt에서 시작한다 가정했고, 연 10% 상승한다고 가정하였습니다.
+ vRWA의 실현은 탐사 완료 시점부터 시작하여 제곱 그래프를 그리며 차츰 실현된다고 가정했습니다. 정확한 일정은 탐사 완료 시점에 확정됩니다.
+ 볼트 자산은 편의상 vRWA 실현에 의해서만 증가한다고 가정하였습니다. 실제로는 RBS의 동작 등에 의해 볼트의 최종 자산 가치가 변동될 수 있습니다.
+ 현재 초기 세일즈 설정 및 epoch 8에 즉시 완판되는 5m의 추가 세일즈와 함께 20m의 보상이 분배된 스테이킹 풀이 추가된다고 가정했습니다.
+ epoch 18에 PCR 행사가 가능해지면 초기 세일즈 유저의 30%가 행사한다고 가정했습니다.

이 시나리오에서 주변 지표들은 다음과 같이 움직입니다.

![KASH Valuation Graph](/img/kash_valuation_sub_metrics.png)

---

이어지는 섹션에서는 이러한 가치 지표를 바탕으로 어떻게 RBS가 동작하는지 설명합니다.