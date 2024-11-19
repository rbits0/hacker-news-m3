import { Stack } from "expo-router";
import React from "react";


export default function NotFoundPage() {
  return <>
    <Stack.Screen options={{ title: 'Page Not Found' }} />
  </>;
}