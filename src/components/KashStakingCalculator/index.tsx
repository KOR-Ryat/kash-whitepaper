// src/components/KashStakingCalculator.js
import React, { useState, useEffect, useRef } from 'react';
import styles from './KashStakingCalculator.module.css';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const EPB_A = 6.160392620707085906;
const EPB_k_denom = 0.540906246443305252;
const EPB_C_add = 3.944556263515440025;
const TOTAL_EPOCHS = 36;
const EPOCH_REWARD_GROWTH_RATE_G = 0.05;
const KASH_PRICE_USD = 1;

const POOL_CONFIG = {
    pool1: {
        label: '풀 1: 초기 세일즈 (0 ~ 5M KASH)',
        salesMinKash: 0,
        salesMaxKash: 5000000,
        dcrCalculationFunction: 'early',
        totalPoolRewardKash: 35000000,
        poolWeightedShareCapKash: 35000000,
    },
    pool2: {
        label: '풀 2: 추가 세일즈 (5M 초과 ~ 10M KASH)',
        salesMinKash: 5000000,
        salesMaxKash: 10000000,
        dcrCalculationFunction: 'additional',
        epbForAdditional: 2,
        totalPoolRewardKash: 15000000,
        poolWeightedShareCapKash: 15000000,
    }
};

function calculateEpbIntegralForInitialSalesMillionUnit(x_million) {
    const INITIAL_SALES_LIMIT_MILLION = POOL_CONFIG.pool1.salesMaxKash / 1000000;
    if (x_million > INITIAL_SALES_LIMIT_MILLION) x_million = INITIAL_SALES_LIMIT_MILLION;
    if (x_million < 0) x_million = 0;
    return (-EPB_A / (x_million + EPB_k_denom)) + (EPB_C_add * x_million);
}
function calculateDcrForPool1(q_b_kash, q_a_kash) {
    const x_b_million = q_b_kash / 1000000;
    const x_a_million = q_a_kash / 1000000;
    const dcr_raw = calculateEpbIntegralForInitialSalesMillionUnit(x_a_million) - calculateEpbIntegralForInitialSalesMillionUnit(x_b_million);
    let dcr = dcr_raw * 1000000;
    return dcr < 0 ? 0 : dcr;
}
function calculateDcrForPool2(q_b_kash, q_a_kash, epbValue) {
    const purchase_in_this_stage = q_a_kash - q_b_kash;
    if (purchase_in_this_stage <= 0) return 0;
    return purchase_in_this_stage * epbValue;
}

export default function KashStakingCalculator() {
    const [selectedPoolKey, setSelectedPoolKey] = useState('pool1');
    const [purchaseTimingKash, setPurchaseTimingKash] = useState(POOL_CONFIG.pool1.salesMinKash);
    const [purchaseAmountKash, setPurchaseAmountKash] = useState(0);
    const [results, setResults] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const lastManuallySetPurchaseAmountRef = useRef(0);
    const [exchangeRate, setExchangeRate] = useState(1400);
    const [fiatCurrency, setFiatCurrency] = useState('KRW');
    const [fiatAmount, setFiatAmount] = useState('');
    const [chartData, setChartData] = useState(null);

    const currentPoolConfig = POOL_CONFIG[selectedPoolKey];

    useEffect(() => {
        setPurchaseTimingKash(currentPoolConfig.salesMinKash);
        setPurchaseAmountKash(0);
        lastManuallySetPurchaseAmountRef.current = 0;
        setFiatAmount('');
        setErrorMessage('');
        setChartData(null);
    }, [selectedPoolKey]);

    const maxPossiblePurchaseInPool = Math.max(0, currentPoolConfig.salesMaxKash - parseFloat(purchaseTimingKash));

    const handlePoolChange = (event) => setSelectedPoolKey(event.target.value);

    const handleTimingChange = (event) => {
        let newTiming = parseFloat(event.target.value);
        if (isNaN(newTiming)) newTiming = currentPoolConfig.salesMinKash;
        newTiming = Math.max(currentPoolConfig.salesMinKash, Math.min(newTiming, currentPoolConfig.salesMaxKash > 0 ? currentPoolConfig.salesMaxKash - 1 : 0));
        setPurchaseTimingKash(newTiming);

        const newMaxPossibleInPool = Math.max(0, currentPoolConfig.salesMaxKash - newTiming);
        let newAmountToSet = (lastManuallySetPurchaseAmountRef.current <= newMaxPossibleInPool) ? lastManuallySetPurchaseAmountRef.current : newMaxPossibleInPool;
        setPurchaseAmountKash(newAmountToSet);
        updateFiatAmountFromKash(newAmountToSet);
    };
    
    const handleAmountChange = (event) => {
        let newAmount = parseFloat(event.target.value);
        if (isNaN(newAmount)) newAmount = 0;
        newAmount = Math.max(0, Math.min(newAmount, maxPossiblePurchaseInPool));
        setPurchaseAmountKash(newAmount);
        lastManuallySetPurchaseAmountRef.current = newAmount;
        updateFiatAmountFromKash(newAmount);
    };

    const handleFiatAmountChange = (event) => {
        const newFiat = event.target.value;
        setFiatAmount(newFiat);
        if (newFiat === '' || isNaN(parseFloat(newFiat))) return;
        
        let kashAmountCalculated = 0;
        const numericFiat = parseFloat(newFiat);
        kashAmountCalculated = (fiatCurrency === 'USD') ? (numericFiat / KASH_PRICE_USD) : ((numericFiat / parseFloat(exchangeRate)) / KASH_PRICE_USD);
        kashAmountCalculated = Math.floor(kashAmountCalculated);
        kashAmountCalculated = Math.max(0, Math.min(kashAmountCalculated, maxPossiblePurchaseInPool));
        setPurchaseAmountKash(kashAmountCalculated);
        lastManuallySetPurchaseAmountRef.current = kashAmountCalculated;
    };
    
    const updateFiatAmountFromKash = (kashValue) => {
        if (isNaN(kashValue) || kashValue === null || kashValue === 0) {
             setFiatAmount('');
             return;
        }
        let newFiatValue = (fiatCurrency === 'USD') ? (kashValue * KASH_PRICE_USD) : (kashValue * KASH_PRICE_USD * parseFloat(exchangeRate));
        setFiatAmount(newFiatValue.toFixed(fiatCurrency === 'KRW' ? 0 : 2));
    };

    useEffect(() => {
        updateFiatAmountFromKash(parseFloat(purchaseAmountKash));
    }, [exchangeRate, fiatCurrency]);

    const calculateAllRewards = () => {
        if (parseFloat(purchaseAmountKash) <= 0) {
            setErrorMessage("구매 KASH 수량은 0보다 커야 계산이 가능합니다.");
            setChartData(null); // 구매량 0이면 차트도 지움
            // 이전 results는 유지
            return;
        }
        setErrorMessage('');

        let q_b_kash_input = parseFloat(purchaseTimingKash);
        let user_purchase_amount_kash_input = parseFloat(purchaseAmountKash);

        if (q_b_kash_input < currentPoolConfig.salesMinKash || (q_b_kash_input >= currentPoolConfig.salesMaxKash && user_purchase_amount_kash_input > 0)) {
            setErrorMessage(`구매 시작 시점(${q_b_kash_input.toLocaleString()})이 선택된 풀 '${currentPoolConfig.label}'의 판매 범위 (${currentPoolConfig.salesMinKash.toLocaleString()} ~ ${currentPoolConfig.salesMaxKash.toLocaleString()}) 내에 있어야 합니다.`);
            setResults(null); setChartData(null);
            return;
        }
        if ((q_b_kash_input + user_purchase_amount_kash_input) > currentPoolConfig.salesMaxKash) {
            setErrorMessage(`구매 후 총 판매량이 선택된 풀 '${currentPoolConfig.label}'의 최대치(${currentPoolConfig.salesMaxKash.toLocaleString()})를 초과할 수 없습니다. 구매 수량을 줄여주세요.`);
            setResults(null); setChartData(null);
            return;
        }

        let user_dcr_earned_kash = 0;
        const q_a_kash_input = q_b_kash_input + user_purchase_amount_kash_input;

        if (currentPoolConfig.dcrCalculationFunction === 'early') {
            user_dcr_earned_kash = calculateDcrForPool1(q_b_kash_input, q_a_kash_input);
        } else if (currentPoolConfig.dcrCalculationFunction === 'additional') {
            user_dcr_earned_kash = calculateDcrForPool2(q_b_kash_input, q_a_kash_input, currentPoolConfig.epbForAdditional);
        }
        user_dcr_earned_kash = Math.max(0, user_dcr_earned_kash);

        const user_average_epb = user_purchase_amount_kash_input > 0 ? (user_dcr_earned_kash / user_purchase_amount_kash_input) : 0;
        const user_total_effective_deposit_kash = user_purchase_amount_kash_input + user_dcr_earned_kash;
        const user_share_percentage_raw = user_total_effective_deposit_kash / currentPoolConfig.poolWeightedShareCapKash;

        let reward_base_for_epoch_kash = (EPOCH_REWARD_GROWTH_RATE_G === 0) ?
            (currentPoolConfig.totalPoolRewardKash / TOTAL_EPOCHS) :
            (currentPoolConfig.totalPoolRewardKash * EPOCH_REWARD_GROWTH_RATE_G) / (Math.pow(1 + EPOCH_REWARD_GROWTH_RATE_G, TOTAL_EPOCHS) - 1);

        const epochDetails = [];
        let current_my_cumulative_interest_kash = 0;
        const chartLabels = ['Start'];
        const chartMyEpochRewardData = [0];
        const chartMyNetAssetData = [user_purchase_amount_kash_input];

        epochDetails.push({
            epoch_number: 0, pool_total_reward_this_epoch_kash: 0, my_reward_this_epoch_kash: 0,
            my_net_asset_kash: user_purchase_amount_kash_input, roi_percentage: 0,
        });

        for (let k = 1; k <= TOTAL_EPOCHS; k++) {
            const pool_total_reward_this_epoch_kash = reward_base_for_epoch_kash * Math.pow(1 + EPOCH_REWARD_GROWTH_RATE_G, k - 1);
            const my_reward_this_epoch_kash = user_share_percentage_raw * pool_total_reward_this_epoch_kash;
            current_my_cumulative_interest_kash += my_reward_this_epoch_kash;
            const my_net_asset_kash = user_purchase_amount_kash_input + current_my_cumulative_interest_kash;
            const roi_percentage = user_purchase_amount_kash_input > 0 ? (current_my_cumulative_interest_kash / user_purchase_amount_kash_input) * 100 : 0;

            epochDetails.push({ epoch_number: k, pool_total_reward_this_epoch_kash, my_reward_this_epoch_kash, my_net_asset_kash, roi_percentage });
            chartLabels.push(`E${k}`);
            chartMyEpochRewardData.push(my_reward_this_epoch_kash);
            chartMyNetAssetData.push(my_net_asset_kash);
        }
        
        const final_roi_percentage = user_purchase_amount_kash_input > 0 ? (current_my_cumulative_interest_kash / user_purchase_amount_kash_input) * 100 : 0;

        setResults({
            user_average_epb, user_dcr_earned_kash, user_total_effective_deposit_kash,
            user_share_percentage: user_share_percentage_raw * 100,
            epochDetails, total_cumulative_interest_36_epochs_kash: current_my_cumulative_interest_kash,
            final_roi_percentage, selected_pool_key: selectedPoolKey,
            user_purchase_kash_amount_at_calc: user_purchase_amount_kash_input
        });

        setChartData({
            labels: chartLabels,
            datasets: [
                { type: 'bar', label: '나의 에포크 보상 (KASH)', data: chartMyEpochRewardData, backgroundColor: 'rgba(255, 159, 64, 0.7)', borderColor: 'rgb(255, 159, 64)', yAxisID: 'y', order: 2 },
                { type: 'line', label: '나의 누적 순자산 (KASH)', data: chartMyNetAssetData, borderColor: 'rgb(54, 162, 235)', backgroundColor: 'rgba(54, 162, 235, 0.3)', tension: 0.1, fill: true, yAxisID: 'y', order: 1 },
            ],
        });
    };

    const chartOptions = {
        responsive: true, maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: '에포크별 보상 및 누적 순자산 변화', font: { size: 16 } },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        let label = context.dataset.label || '';
                        if (label) label += ': ';
                        if (context.parsed.y !== null) label += context.parsed.y.toLocaleString(undefined, {maximumFractionDigits:0}) + ' KASH';
                        return label;
                    }
                }
            }
        },
        scales: {
            y: { type: 'linear', display: true, position: 'left', beginAtZero: true, title: { display: true, text: 'KASH 수량' }, ticks: { callback: function(value) { return value.toLocaleString(); }}},
            x: { title: { display: true, text: '에포크' }}
        }
    };

    return (
        <div className={styles.calculatorContainer}>
            <div className={styles.assumptions}>
                <h2>📝 계산기 주요 가정 (예시)</h2>
                <ul>
                    <li>이 계산기는 선택된 스테이킹 풀이 최대 용량으로 채워졌다는 가정 하에 최소 보장 수익을 보여줍니다.</li>
                </ul>
            </div>

            <div className={styles.inputSection}>
                <h3 className={styles.sectionTitle}>1. 스테이킹 풀 및 구매 조건 설정</h3>
                <div className={styles.inputGroup}>
                    <label htmlFor="poolSelect" className={styles.labelFullWidth}>스테이킹 풀 선택:</label>
                    <select id="poolSelect" value={selectedPoolKey} onChange={handlePoolChange} className={styles.selectInput}>
                        <option value="pool1">{POOL_CONFIG.pool1.label}</option>
                        <option value="pool2">{POOL_CONFIG.pool2.label}</option>
                    </select>
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="purchaseTimingSlider" className={styles.labelWithVal}>
                        KASH 구매 시작 시점 (누적 판매량): 
                        <span className={styles.valueDisplay}>{parseFloat(purchaseTimingKash).toLocaleString()} KASH</span>
                    </label>
                    <div className={styles.sliderInputWrapper}>
                        <input
                            type="range" id="purchaseTimingSlider"
                            min={currentPoolConfig.salesMinKash} 
                            max={currentPoolConfig.salesMaxKash > 0 ? currentPoolConfig.salesMaxKash -1 : 0}
                            value={purchaseTimingKash} onChange={handleTimingChange}
                            className={styles.slider} step="1000" />
                        <input
                            type="number" id="purchaseTimingInput"
                            value={purchaseTimingKash} onChange={handleTimingChange}
                            min={currentPoolConfig.salesMinKash} 
                            max={currentPoolConfig.salesMaxKash > 0 ? currentPoolConfig.salesMaxKash -1 : 0}
                            className={styles.numberInputCompact} step="1000" />
                    </div>
                    <small className={styles.inputDescription}>
                        선택한 풀의 판매 범위: {currentPoolConfig.salesMinKash.toLocaleString()} ~ {currentPoolConfig.salesMaxKash.toLocaleString()} KASH
                    </small>
                </div>
            </div>

            <div className={styles.inputSection}>
                <h3 className={styles.sectionTitle}>2. 구매 금액 설정</h3>
                <div className={styles.inputGrid}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="purchaseAmountSlider" className={styles.labelWithVal}>
                            구매 KASH 수량: 
                            <span className={styles.valueDisplay}>{parseFloat(purchaseAmountKash).toLocaleString()} KASH</span>
                        </label>
                        <div className={styles.sliderInputWrapper}>
                            <input
                                type="range" id="purchaseAmountSlider"
                                min="0" max={maxPossiblePurchaseInPool} 
                                value={purchaseAmountKash} onChange={handleAmountChange}
                                className={styles.slider} step="1000" 
                                disabled={maxPossiblePurchaseInPool <= 0 && parseFloat(purchaseTimingKash) >= currentPoolConfig.salesMaxKash} />
                            <input
                                type="number" id="purchaseAmountInput"
                                value={purchaseAmountKash} onChange={handleAmountChange}
                                min="0" max={maxPossiblePurchaseInPool}
                                className={styles.numberInputCompact} step="1000"
                                disabled={maxPossiblePurchaseInPool <= 0 && parseFloat(purchaseTimingKash) >= currentPoolConfig.salesMaxKash} />
                        </div>
                        {maxPossiblePurchaseInPool <= 0 && parseFloat(purchaseTimingKash) >= currentPoolConfig.salesMaxKash && 
                            <small className={styles.warningText}>선택한 구매 시작 시점에서는 더 이상 구매할 수 없습니다.</small>}
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="fiatAmountInput" className={styles.labelFullWidth}>또는, FIAT 기준 구매 금액:</label>
                        <div className={styles.fiatRateWrapper}>
                             1 USD = <input 
                                    type="number" 
                                    value={exchangeRate} 
                                    onChange={(e) => setExchangeRate(parseFloat(e.target.value) || 1)} 
                                    className={styles.inlineNumberInputShort} /> KRW
                        </div>
                        <div className={styles.fiatInputWrapper}>
                            <input 
                                type="number" 
                                id="fiatAmountInput" 
                                value={fiatAmount} 
                                onChange={handleFiatAmountChange} 
                                className={styles.numberInputFiat} 
                                placeholder="금액 입력"
                            />
                            <select value={fiatCurrency} onChange={(e) => setFiatCurrency(e.target.value)} className={styles.fiatCurrencySelect}>
                                <option value="KRW">KRW</option>
                                <option value="USD">USD</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className={styles.buttonContainer}>
                <button 
                    onClick={calculateAllRewards} 
                    className={`${styles.calculateButton} ${parseFloat(purchaseAmountKash) <= 0 ? styles.disabledButton : ''}`} 
                    disabled={parseFloat(purchaseAmountKash) <= 0}
                >
                    🚀 수익 예상해보기! ✨
                </button>
            </div>

            {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

            {results && (
                <>
                    <div className={styles.resultsSection}>
                        <div className={styles.summaryAndPoolInfo}>
                            <p className={styles.poolInfoText}>
                                선택 풀: {POOL_CONFIG[results.selected_pool_key]?.label || 'N/A'}
                                 |  총 {TOTAL_EPOCHS} 에포크
                                 |  풀 보상 총액: {POOL_CONFIG[results.selected_pool_key]?.totalPoolRewardKash.toLocaleString()} KASH
                                 |  풀 Share Cap: {POOL_CONFIG[results.selected_pool_key]?.poolWeightedShareCapKash.toLocaleString()}
                            </p>
                            {typeof results.user_purchase_kash_amount_at_calc !== 'undefined' && results.user_purchase_kash_amount_at_calc > 0 && (
                                <table className={styles.summaryTable}>
                                    <tbody>
                                        <tr>
                                            <td>DCR / EPB</td>
                                            <td><strong>{results.user_dcr_earned_kash.toLocaleString(undefined, { maximumFractionDigits: 0 })}</strong> KASH</td>
                                            <td>* <strong>{results.user_average_epb.toFixed(2)}</strong> 배</td>
                                        </tr>
                                        <tr>
                                            <td>유효 지분</td>
                                            <td><strong>{results.user_total_effective_deposit_kash.toLocaleString(undefined, { maximumFractionDigits: 0 })}</strong> KASH</td>
                                            <td>Share of Cap: <strong>{results.user_share_percentage.toFixed(4)}</strong> %</td>
                                        </tr>
                                        <tr>
                                            <td>총 누적 이자</td>
                                            <td><strong>{results.total_cumulative_interest_36_epochs_kash.toLocaleString(undefined, { maximumFractionDigits: 0 })}</strong> KASH</td>
                                            <td>+<strong>{results.final_roi_percentage.toFixed(2)}</strong> %</td>
                                        </tr>
                                    </tbody>
                                </table>
                            )}
                            {typeof results.user_purchase_kash_amount_at_calc !== 'undefined' && results.user_purchase_kash_amount_at_calc <= 0 && results.epochDetails && results.epochDetails.length > 0 && (
                                <p className={styles.infoText}>구매 수량이 0입니다. 구매 수량을 입력 후 다시 계산해주세요.</p>
                            )}
                        </div>

                        {chartData && typeof results.user_purchase_kash_amount_at_calc !== 'undefined' && results.user_purchase_kash_amount_at_calc > 0 && (
                            <div className={styles.chartContainer}>
                                <Bar data={chartData} options={chartOptions} />
                            </div>
                        )}

                        {typeof results.user_purchase_kash_amount_at_calc !== 'undefined' && results.user_purchase_kash_amount_at_calc > 0 && results.epochDetails && (
                            <div className={styles.resultsTableContainer}>
                                <h2>🗓️ 에포크별 상세 예상 수익</h2>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>에포크</th>
                                            <th>풀 전체 에포크 보상 (KASH)</th>
                                            <th>나의 에포크 보상 (KASH)</th>
                                            <th>순자산 (KASH)</th>
                                            <th>수익률 (%)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {results.epochDetails.map((epoch) => (
                                            <tr key={epoch.epoch_number}>
                                                <td>{epoch.epoch_number}</td>
                                                <td>{epoch.pool_total_reward_this_epoch_kash.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                                                <td>{epoch.my_reward_this_epoch_kash.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                                                <td>{epoch.my_net_asset_kash.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                                                <td>{epoch.roi_percentage.toFixed(2)} %</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <p className={styles.note}>
                                    * "순자산 (KASH)"은 초기 구매 원금 + 해당 에포크까지의 누적 이자입니다.<br/>
                                    * "수익률 (%)"은 초기 투자 원금 대비 현재까지의 누적 이자 비율입니다.
                                </p>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}