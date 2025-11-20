package com.example.onlinefood.service;

import com.example.onlinefood.Enum.PaymentMethod;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentStrategyFactory {

    @Autowired
    private BalancePaymentStrategy balancePaymentStrategy;

    @Autowired
    private WechatPaymentStrategy wechatPaymentStrategy;

    @Autowired
    private AlipayPaymentStrategy alipayPaymentStrategy;

    public PaymentStrategy getPaymentStrategy(PaymentMethod paymentMethod) {

        switch (paymentMethod) {
            case BALANCE:
                return balancePaymentStrategy;
            case WECHAT:
                return wechatPaymentStrategy;
            case ALIPAY:
                return alipayPaymentStrategy;
            default:
                throw new IllegalArgumentException("Unsupported payment method: " + paymentMethod);
        }

    }

}
