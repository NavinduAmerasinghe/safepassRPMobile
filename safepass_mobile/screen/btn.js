import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function Btn({ Press, bgColor, textColor, btnLabel }) {
  return (
    <TouchableOpacity
      onPress={Press}
      style={{
        backgroundColor: bgColor,
        borderRadius: 100,
        alignItems: "center",
        width: 350,
        paddingVertical: 5,
        marginVertical: 10,
        marginBottom: 20,
      }}
    >
      <Text style={{ color: textColor, fontSize: 25, fontWeight: "bold" }}>
        {btnLabel}
      </Text>
    </TouchableOpacity>
  );
}
