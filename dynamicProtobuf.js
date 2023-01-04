import protobuf from "protobufjs";

export const encodePayloadProtobuf = async (
  reqObj: any,
  protoName: string,
  lookupName: string
) => {
  const root = await protobuf.load(protoName);
  const AwesomeMessage = root.lookupType(lookupName);
  let message = AwesomeMessage.create(reqObj);
  let buffer = AwesomeMessage.encode(message).finish();
  return buffer;
};

export const decodeResponseProtobuf = async (
  buffer: any,
  protoName: string,
  lookupName: string
) => {
  const root = await protobuf.load(protoName);
  const AwesomeMessage = root.lookupType(lookupName);
  const uint8 = new Uint8Array(buffer);
  let decoded = AwesomeMessage.decode(uint8);
  return JSON.parse(JSON.stringify(decoded));
};
